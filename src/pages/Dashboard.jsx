import { LogOut, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import { Section, Card } from "@/components/ui/Primitives";
import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const metadata = user?.user_metadata ?? {};

  return (
    <>
      <Seo title="Dashboard — RGTvertex" description="Your RGTvertex account dashboard." />
      <PageHero eyebrow="Account" title={`Welcome back${metadata.full_name ? `, ${metadata.full_name.split(" ")[0]}` : ""}.`} description="This is your RGTvertex dashboard." />

      <Section>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          <Card hover={false} className="p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink-faint">Account details</h3>
            <div className="flex flex-col gap-3 text-sm text-ink">
              <div className="flex items-center gap-2.5">
                <User size={16} className="text-ink-faint" />
                <span>{metadata.full_name || "—"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-ink-faint" />
                <span>{user?.email}</span>
              </div>
            </div>
          </Card>

          <Card hover={false} className="flex flex-col justify-between p-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.1em] text-ink-faint">Agents</h3>
              <p className="text-sm text-ink-soft">No agents deployed yet. Reach out to your RGTvertex contact to get your first agent live.</p>
            </div>
            <Button to="/contact" size="sm" className="mt-4 self-start">Talk to us</Button>
          </Card>
        </div>

        <div className="mx-auto mt-6 max-w-3xl">
          <Button onClick={handleLogout} variant="ghost" size="sm" icon={false} className="gap-2">
            <LogOut size={16} /> Log out
          </Button>
        </div>
      </Section>
    </>
  );
}
