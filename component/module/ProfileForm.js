function ProfileForm({
  name,
  lastName,
  setName,
  setLastName,
  password,
  setPassword,
  submithandler,
}) {
  return (
    <>
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={submithandler}>Submit</button>
    </>
  );
}

export default ProfileForm;
