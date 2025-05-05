import { ScholarshipsTab as ScholarshipsTabComponent } from "./Scholarships";

export function ScholarshipsTab(props: { academicYear: string | number; onRefetch: () => Promise<void> }) {
  return <ScholarshipsTabComponent {...props} />;
}
