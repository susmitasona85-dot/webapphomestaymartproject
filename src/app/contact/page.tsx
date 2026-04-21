import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Have questions about our stays or want to plan a custom experience? We're here to help.
          </p>

          <div className="space-y-8">
            <ContactMethod
              icon={<Phone className="text-primary" />}
              title="WhatsApp / Call"
              value={`+${siteConfig.whatsappNumber}`}
            />
            <ContactMethod
              icon={<Mail className="text-primary" />}
              title="Email"
              value={siteConfig.email}
            />
            <ContactMethod
              icon={<MapPin className="text-primary" />}
              title="Office Address"
              value={siteConfig.address}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-border">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="john@example.com" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Inquiry about Forest Cabin" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Tell us more about your requirements..." className="min-h-[150px]" />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 h-12 gap-2">
              <Send className="w-4 h-4" /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactMethod({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
