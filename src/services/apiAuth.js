import supabase from './supabase';

export async function signup({ email, password, name }) {
  const { data: user, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) throw new Error(signupError.message);

  // const { data, error } = await supabase
  //   .from('users')
  //   .insert([{ email, name, user_id: user.id }])
  //   .single();

  // if (error) throw new Error(error.message);

  return user;
}

export async function verifyEmail(token) {
  const { error, data: user } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'email',
  });
  console.log(user);
  if (error) throw new Error(error.message);

  const { data, error: updateError } = await supabase
    .from('users')
    .update({ verified: true })
    .match({ id: user.id });

  if (updateError) throw new Error(updateError.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function updateUser(newEmail, newPassword) {
  const userData = await getUser();
  const { data, error } = await supabase.auth.updateUser({
    email: userData.email,
    password: userData.password,
    data: { email: newEmail, password: newPassword },
  });
  if (error) throw new Error(error.message);
  return data;
}
