import AccountInfoForm from "@/components/forms/account-info";
import { useOutletContext } from "react-router-dom";
import ChangePassword from "@/components/forms/change-password";
import ProfileImageForm from "@/components/forms/profile-img-form";

function PrAccount() {
  const { user } = useOutletContext();

  return (
    <div className="w-full flex flex-col gap-5 md:w-[80%] md:gap-8 lg:w-full lg:gap-4 xl:flex-row h-full">
      <div className="lg:flex-row lg:gap-4 flex flex-col gap-5 md:gap-8 flex-1">
        <AccountInfoForm user={user} />
        <ChangePassword user={user} />
      </div>
      <div className="flex-1">
        <ProfileImageForm defaultUrl={user?.profilePhotoUrl} />
      </div>
    </div>
  );
}

export default PrAccount;