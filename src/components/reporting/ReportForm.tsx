import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Mic, MicOff, MapPin, Navigation } from 'lucide-react';
import { IssueCategory, IssuePriority, CreateIssueInput } from '../../types/issue';
import { categoryLabels } from '../../types/issue';
import { createIssue } from '../../lib/issue-service';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { detectCategoryFromText, detectPriorityFromText, extractTitleFromText } from '../../lib/category-detector';
import { getAuthoritiesForLocation, getAuthoritiesForCategory } from '../../lib/authorities-mapping';

interface ReportFormProps {
  defaultLat?: number;
  defaultLng?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
  onLocationSelect?: (lat: number, lng: number) => void;
}

export function ReportForm({ defaultLat, defaultLng, onSuccess, onCancel, onLocationSelect }: ReportFormProps) {
  const [category, setCategory] = useState<IssueCategory | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('medium');
  const [latitude, setLatitude] = useState(defaultLat?.toString() || '26.8467');
  const [longitude, setLongitude] = useState(defaultLng?.toString() || '80.9462');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAuthorities, setSelectedAuthorities] = useState<string[]>([]);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);

  const { transcript, isListening, startListening, stopListening, error: speechError } = useSpeechRecognition();

  // Auto-fill from voice transcript
  useEffect(() => {
    if (transcript && !isListening) {
      setDescription(transcript);
      
      // Auto-detect category and priority
      const detectedCategory = detectCategoryFromText(transcript);
      const detectedPriority = detectPriorityFromText(transcript);
      
      setCategory(detectedCategory);
      setPriority(detectedPriority);
      
      // Extract title
      if (!title) {
        setTitle(extractTitleFromText(transcript));
      }
    }
  }, [transcript, isListening, title]);

  // Auto-tag authorities based on location and category
  useEffect(() => {
    if (latitude && longitude && category) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        const locationAuthorities = getAuthoritiesForLocation(lat, lng);
        const categoryAuthorities = getAuthoritiesForCategory(category);
        
        // Combine and deduplicate
        const allAuthorities = [...locationAuthorities, ...categoryAuthorities];
        const uniqueAuthorities = Array.from(
          new Map(allAuthorities.map(auth => [auth.id, auth])).values()
        );
        
        setSelectedAuthorities(uniqueAuthorities.map(auth => auth.name));
      }
    }
  }, [latitude, longitude, category]);

  const handleGetMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat.toString());
        setLongitude(lng.toString());
        
        if (onLocationSelect) {
          onLocationSelect(lat, lng);
        }
        setLoading(false);
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) {
      setError('Please select a category');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const input: CreateIssueInput = {
        category: category as IssueCategory,
        title: title.trim(),
        description: description.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        priority,
        reported_by: 'Citizen',
        authorities: selectedAuthorities,
      };

      await createIssue(input);
      
      // Reset form
      setCategory('');
      setTitle('');
      setDescription('');
      setPriority('medium');
      setSelectedAuthorities([]);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {error && (
        <div className="neo-border-thick bg-red-500 text-white p-3 font-bold">
          {error}
        </div>
      )}

      {speechError && (
        <div className="neo-border-thick bg-yellow-500 text-black p-3 font-bold">
          {speechError}
        </div>
      )}

      {/* Voice Recording Section */}
      <div className="neo-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-bold text-black">Voice Report</label>
          <Button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`neo-button ${isListening ? 'bg-red-500' : 'bg-neo-cyan'} text-white`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </>
            )}
          </Button>
        </div>
        {isListening && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-black">Listening...</span>
          </div>
        )}
        {transcript && (
          <div className="neo-border-thick bg-gray-50 p-3">
            <p className="text-sm text-gray-700">{transcript}</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="font-bold text-black">Category *</label>
        <Select value={category} onValueChange={(value) => setCategory(value as IssueCategory)}>
          <SelectTrigger className="neo-border-thick">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="font-bold text-black">Title *</label>
        <Input
          className="neo-border-thick"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of the issue"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="font-bold text-black">Description *</label>
        <Textarea
          className="neo-border-thick"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the issue"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="font-bold text-black">Priority</label>
        <Select value={priority} onValueChange={(value) => setPriority(value as IssuePriority)}>
          <SelectTrigger className="neo-border-thick">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location Section */}
      <div className="neo-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-bold text-black flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <Button
            type="button"
            onClick={handleGetMyLocation}
            disabled={loading}
            className="neo-button bg-neo-purple text-white"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Get My Location
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-black">Latitude</label>
            <Input
              className="neo-border-thick"
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-black">Longitude</label>
            <Input
              className="neo-border-thick"
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
        </div>
        <p className="text-xs text-gray-600">
          Click on the map to select location, or use "Get My Location" button
        </p>
      </div>

      {/* Auto-tagged Authorities */}
      {selectedAuthorities.length > 0 && (
        <div className="neo-card p-4">
          <label className="font-bold text-black mb-2 block">Tagged Authorities</label>
          <div className="flex flex-wrap gap-2">
            {selectedAuthorities.map((auth, index) => (
              <span
                key={index}
                className="neo-border-thick bg-neo-yellow px-3 py-1 text-xs font-bold text-black"
              >
                {auth}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="neo-button bg-neo-green text-black font-bold flex-1"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="neo-button bg-gray-300 text-black font-bold"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
