import supabase from './supabase';

export async function signup({ email, password, name }) {
  const { data: user, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: name,
        profile_picture: null
      },
      emailRedirectTo: 'http://localhost:5173/verified',
    },
  });

  if (signupError) throw new Error(signupError.message);

  return user;
}

export async function uploadUser(data) {
  console.log(data);
  const { data: user, error: userError } = await supabase
    .from('users')
    .insert([
      {
        email: data.email,
        name: data.identities[0].identity_data.first_name,
        user_id: data.id,
        verified: true,
      },
    ])
    .single();
  if (userError) throw new Error(userError.message);

  const { data: gameHistory, error: gameHistoryError } = await supabase
    .from('game_history')
    .insert([
      {
        user_id: data.id,
      },
    ])
    .select();
  if (gameHistoryError) throw new Error(gameHistoryError.message);
  return { user, gameHistory };
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
  let { data: user, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  if (loginError) throw new Error(loginError.message);
  let { data: gameHistory, error: gameHistoryError } = await supabase
    .from('game_history')
    .select('*')
    .eq('user_id', user.user.id)
    .single();
  if (gameHistoryError) throw new Error(gameHistoryError.message);
  return { user, gameHistory };
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

export async function updatePassword({ newPassword }) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw new Error(error.message);
}

export async function updateUsername({ newUsername, id }) {
  console.log(newUsername, id);
  const { error: authError } = await supabase.auth.updateUser({
    data: { first_name: newUsername },
  });
  if (authError) throw new Error(authError.message);

  const { error: tableError } = await supabase
    .from('users')
    .update({ name: newUsername })
    .eq('user_id', id)
    .select();

  if (tableError) throw new Error(tableError.message);
}

export async function updateEmail({ newEmail, id }) {
  const { error: serverError } = await supabase.auth.updateUser({
    email: newEmail,
  });
  if (serverError) throw new Error(serverError.message);

  const { error: tableError } = await supabase
    .from('users')
    .update({ email: newEmail })
    .eq('user_id', id)
    .select();

  if (tableError) throw new Error(tableError.message);
}

export async function deleteUser(id) {
  const { error: deleteUserError } = await supabase.auth.admin.deleteUser(id);
  if (deleteUserError) throw new Error(deleteUserError.message);

  const { error: deleteUserFromTableError } = await supabase
    .from('users')
    .delete()
    .eq('user_id', id);

  if (deleteUserFromTableError)
    throw new Error(deleteUserFromTableError.message);

  const { error: deleteGameHistoryError } = await supabase
    .from('game_history')
    .delete()
    .eq('user_id', id);

  if (deleteGameHistoryError) throw new Error(deleteGameHistoryError.message);
}
