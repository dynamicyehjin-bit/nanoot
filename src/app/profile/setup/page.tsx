import { redirect } from 'next/navigation';

// Legacy page — redirects to the canonical profile setup page
export default function ProfileSetupLegacyPage() {
  redirect('/auth/setup-profile');
}
