import { useHistory } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { useAuth } from '../hooks/useAuth';

import Button from '../components/Button';

import '../styles/auth.scss';

export default function Home() {
  const history = useHistory();
  const { loginWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await loginWithGoogle();
    }

    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationImg} alt="background" />
        <strong>Create Q&amp;A live rooms</strong>
        <p>Ask your audience's questions in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google Icon" />
            Create your room with Google
          </button>
          <div className="divider">Or join an existing room</div>
          <form action="">
            <input type="text" placeholder="Enter with a room's code" />
            <Button type="submit">Join the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
