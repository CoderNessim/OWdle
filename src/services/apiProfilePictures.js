import supabase from './supabase';

export async function createProfilePicture({ id, name, avatarFile }) {
  const { error: storageError } = await supabase.storage
    .from('profile_pictures')
    .upload(`avatar-${name}/${avatarFile.name}`, avatarFile, {
      cacheControl: '3600',
      contentType: avatarFile.type,
      upsert: false,
    });

  if (storageError) throw new Error(storageError.message);

  const { data: urlData, error: urlError } = supabase.storage
    .from('profile_pictures')
    .getPublicUrl(`avatar-${name}`);

  if (urlError) throw new Error(urlError.message);

  const { error: authError } = await supabase.auth.updateUser({
    data: { profile_picture: `${urlData.publicUrl}/${avatarFile.name}` },
  });

  if (authError) throw new Error(authError.message);

  const { error: updateError } = await supabase
    .from('users')
    .update({ profile_picture: urlData })
    .eq('user_id', id)
    .select();

  if (updateError) throw new Error(updateError.message);
}

export async function deleteProfilePicture({ name, id, avatarFile }) {
  console.log(avatarFile)
  const pathSegments = avatarFile.split('/');

  // Supabase URL format: /storage/v1/object/public/<bucket-name>/<path-to-file>
  const filePath = pathSegments.slice(6).join('/'); // Get the part after the bucket name
  console.log(filePath);
  const { error: bucketError } = await supabase.storage
    .from('profile_pictures')
    .remove([filePath]);

  if (bucketError) throw new Error(bucketError.message);

  const { error: updateError } = await supabase
    .from('users')
    .update({ profile_picture: null })
    .eq('user_id', id)
    .select();

  if (updateError) throw new Error(updateError.message);

  const { error: authError } = await supabase.auth.updateUser({
    data: { profile_picture: null },
  });

  if (authError) throw new Error(authError.message);
}
