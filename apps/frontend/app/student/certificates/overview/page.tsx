import { redirect } from 'next/navigation';

export default function OverviewPage() {
  // Redirect to الكورسات النشطة كافتراضي
  redirect('/student/certificates/overview/mycertificates');
}
