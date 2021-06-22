import { Link } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import Button from '../components/Button';

import '../styles/auth.scss';

export default function NewRoom() {
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
          <h2>Create a new room</h2>
          <form action="">
            <input type="text" placeholder="Room's name" />
            <Button type="submit">Create room</Button>
          </form>
          <p>
            Do you want to join an existing room? <Link to="/">Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
