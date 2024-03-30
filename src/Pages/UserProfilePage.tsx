import UserProfileForm from "@/Forms/user-profile-form/UserProfileForm";
import { updateMyUser, useGetMyUser } from "@/api/MyUserApi";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = updateMyUser();

  if (isGetLoading) {
    return <span> Loading...</span>;
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
