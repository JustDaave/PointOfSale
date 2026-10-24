import { staffMembers } from "@/data/staff";
import { StaffMember } from "@/types/staff";
import { createContext, ReactNode, useContext, useState } from "react";

// Keeps track of which staff member is signed in to the register.
// The root layout uses it to protect screens, the header shows the name,
// and orders/receipts record who served the customer.
type AuthContextValue = {
  staff: StaffMember | null;
  signIn: (staffId: string, pin: string) => boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [staff, setStaff] = useState<StaffMember | null>(null);

  function signIn(staffId: string, pin: string) {
    const member = staffMembers.find((person) => person.id === staffId);
    if (!member || member.pin !== pin) return false;
    setStaff(member);
    return true;
  }

  function signOut() {
    setStaff(null);
  }

  return <AuthContext.Provider value={{ staff, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
