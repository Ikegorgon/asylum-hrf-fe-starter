import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  // Deconstruct User and Error variables from useAuth0
  const { isLoading, error, user, logout } = useAuth0();

  if (isLoading && !user) {
    return <div className='text-center p-4'>Loading...</div>;
  }
  if (error) {
    return <div className='text-center p-4'>Error...</div>
  }

  // Return Profile Card
  return (
    <section>
      <div className='flex-c'>
        <div className='flex justify-center m-14 gap-20'>
          <div className='profile-display flex-c gap-3'>
            <img src={user.picture} alt='Profile Picture' />
            <h3>{user.nickname}</h3>
            <hr />
            <a href={'mailto:' + user.email}>{user.email}</a>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
