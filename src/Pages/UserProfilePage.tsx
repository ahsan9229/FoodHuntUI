import UserProfileForm from "@/Forms/user-profile-form/UserProfileForm";
import { updateMyUser, useGetMyUser } from "@/api/MyUserApi";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = updateMyUser();

  if (isGetLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[450px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
    );

    //<span> Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to laod user Profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
