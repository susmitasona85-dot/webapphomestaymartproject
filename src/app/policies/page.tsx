import { Shield, FileText, Lock, RefreshCcw } from "lucide-react";

export default function PoliciesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Terms & Policies</h1>

      <div className="space-y-12">
        <PolicySection
          icon={<Shield className="text-primary" />}
          title="Booking & Payments"
          content={`All bookings are confirmed via WhatsApp. While we do not have an automated payment gateway, we require a 50% advance via UPI or Bank Transfer to block your dates. The balance is payable at the property upon check-in.`}
        />

        <PolicySection
          icon={<RefreshCcw className="text-primary" />}
          title="Cancellation Policy"
          content={`- 100% refund for cancellations made 7 days prior to arrival.\n- 50% refund for cancellations made 3-7 days prior to arrival.\n- No refund for cancellations made within 72 hours of check-in.\n- Rescheduling is allowed once, subject to availability.`}
        />

        <PolicySection
          icon={<FileText className="text-primary" />}
          title="House Rules"
          content={`- Respect the silence of the forest: No loud music after 10:00 PM.\n- Smoking is only permitted in designated outdoor areas.\n- Please dispose of plastic waste in provided bins only.\n- Local laws and identification requirements must be followed.`}
        />

        <PolicySection
          icon={<Lock className="text-primary" />}
          title="Privacy Policy"
          content={`Your contact details are used solely for booking purposes and communicating details about your stay. We do not sell your data to third-party advertisers.`}
        />
      </div>
    </div>
  );
}

function PolicySection({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="flex gap-6">
      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}
