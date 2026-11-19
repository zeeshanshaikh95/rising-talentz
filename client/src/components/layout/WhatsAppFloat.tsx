import { waLink, WHATSAPP_DISPLAY } from '@/lib/event';
import { trackEvent } from '@/lib/analytics';

export function WhatsAppFloat() {
  return (
    <a
      href={waLink('Hello Rising Talents, I visited the website and would like to talk to the team.')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent({ type: 'whatsapp_click' })}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#128C7E] px-4 py-3 text-sm font-bold text-white shadow-ticket"
      aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
    >
      <span className="h-2 w-2 rounded-full bg-white" />
      WhatsApp
    </a>
  );
}
