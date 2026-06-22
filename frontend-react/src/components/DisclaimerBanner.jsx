import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] h-disclaimer flex items-center justify-center gap-2 text-[0.72rem] text-[#c44545] tracking-[0.02em] px-4 text-center bg-danger-bg border-b border-danger-border">
      <AlertTriangle size={14} className="text-danger-red flex-shrink-0" />
      <strong className="text-danger-red">Academic Informational Prototype Only.</strong>
      This tool does NOT provide clinical diagnoses, medical advice, or treatment recommendations.
      Always consult a qualified healthcare professional for medical concerns.
    </div>
  );
}
