import { Boxes } from './Boxes';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-neutral-900 overflow-hidden">
      <Boxes />
    </div>
  );
}
