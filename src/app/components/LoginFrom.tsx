import React, { useState} from "react";
import axios from "axios";

const LoginFrom: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('/users/login', {
                email,
                password,
            });

            console.log('Todo bien1', response.data);
            // Guardar token en localStorage
            // localStorage.setItem('token', response.data.token);

        } catch (error) {
            setError('Todo mal Login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginFrom;