import React from 'react';

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>Welcome to My Portfolio</h1>
        <p>This is a simple page you can easily edit.</p>
      </header>
      <main>
        <section style={{ marginBottom: '20px' }}>
          <h2>About Me</h2>
          <p>
            Hello! I'm [Your Name], a [Your Profession/Role]. Feel free to
            customize this section with your own information.
          </p>
        </section>
        <section>
          <h2>Projects</h2>
          <ul>
            <li>Project 1 - Description</li>
            <li>Project 2 - Description</li>
            <li>Project 3 - Description</li>
          </ul>
        </section>
      </main>
      <footer style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;