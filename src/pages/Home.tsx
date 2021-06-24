import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';

import Button from '../components/Button';

import '../styles/auth.scss';

export default function Home() {
  const history = useHistory();
  const { loginWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await loginWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Enter with a room's code"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Join the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
