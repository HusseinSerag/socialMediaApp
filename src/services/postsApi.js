import {
  LIKES_TABLE_NAME,
  POSTS_TABLE_NAME,
  USER_TABLE_NAME,
  COMMENTS_TABLE_NAME,
  POSTS_PHOTOS_BUCKET_NAME,
  POSTS_PHOTOS_TABLE_NAME,
  AVATAR_BUCKET_NAME,
  FRIENDS_TABLE_NAME,
  SAVED_POSTS_TABLE_NAME,
  NOTIFICATIONS_TABLE_NAME,
} from "../utils/Constants";
import { getAssetURL, throwError } from "../utils/helpers";
import { userFriends } from "./friendsApi";
import supabase from "./supabase";

export async function createPost({ postOwner, postContent, photos }) {
  console.log(photos);
  const { data, error } = await supabase
    .from(POSTS_TABLE_NAME)
    .insert({ postOwner, postContent })
    .select()
    .single();

  if (error) {
    throw throwError(error.message, error.code);
  }
  const { id: postId } = data;
  if (photos.length !== 0) {
    await Promise.all([
      ...Array.from(photos).map(async (photo, index) => {
        const fileName = `${index}_${Math.random()}${photo.name.replace("/", "")}_${postId}`;
        const { data: filePath, error: uploadError } = await supabase.storage
          .from(POSTS_PHOTOS_BUCKET_NAME)
          .upload(fileName, photo);

        if (uploadError) {
          throwError(uploadError.message, uploadError.code);
        }
        const { path } = filePath;
        const absolutePath = getAssetURL(POSTS_PHOTOS_BUCKET_NAME, path);
        await AddPostPhoto({ postId, absolutePath });
      }),
    ]);
  }
  return data;
}

async function AddPostPhoto({ postId, absolutePath }) {
  const { data, error } = await supabase
    .from(POSTS_PHOTOS_TABLE_NAME)
    .insert({ postId, photo: absolutePath });
  if (error) {
    throwError(error.message, error.code);
  }
  return data;
}
export async function getPosts({ id, homepage, user }) {
  if (homepage) {
    const { id } = user;

    const data = await userFriends({ id, status: "accepted" });

    const allPosts = await Promise.all([
      ...data.map((person) => {
        return getUserPost(person.id);
      }),
      getUserPost(id),
    ]);

    const posts = allPosts.flat();
    const sortedPosted = posts.sort((a, b) => {
      return b.created_at.localeCompare(a.created_at);
    });
    return sortedPosted;
  }
  return await getUserPost(id);
}

async function getUserPost(id) {
  if (id) {
    const { data, error } = await supabase
      .from(`${POSTS_TABLE_NAME}`)
      .select(`*,${USER_TABLE_NAME}("*"),${POSTS_PHOTOS_TABLE_NAME}(*)`)
      .eq("postOwner", id);
    if (error) {
      throwError(error.message, error.code);
    }

    return data;
  } else {
    return [];
  }
}
async function getPostByPostId(id) {
  if (id) {
    const { data, error } = await supabase
      .from(`${POSTS_TABLE_NAME}`)
      .select(`*,${USER_TABLE_NAME}("*"),${POSTS_PHOTOS_TABLE_NAME}(*)`)
      .eq("id", id);
    if (error) {
      throwError(error.message, error.code);
    }

    return data;
  } else {
    return [];
  }
}
export async function deletePost({ id }) {
  const { error } = await supabase.from(POSTS_TABLE_NAME).delete().eq("id", id);
  if (error) {
    throwError(error.message, error.code);
  }
}

export async function likePost({ postId, likedUser }) {
  const { data, error } = await supabase
    .from(LIKES_TABLE_NAME)
    .insert([{ postId, likedUser }])
    .select();

  if (error) {
    throwError(error.message, error.code);
  }
  return data;
}
export async function unlikePost({ postId, likedUser }) {
  const { error } = await supabase
    .from(LIKES_TABLE_NAME)
    .delete()
    .eq("postId", postId)
    .eq("likedUser", likedUser);

  if (error) {
    throwError(error.message, error.code);
  }
}
export async function getLikes({ postId }) {
  if (!postId) return [];
  const { data, error } = await supabase
    .from(LIKES_TABLE_NAME)
    .select(`*,${USER_TABLE_NAME}(*),${POSTS_TABLE_NAME}(*)`)
    .eq("postId", postId);
  if (error) {
    if (error.code === "400") {
      return [];
    }
    throwError(error.message, error.code);
  }

  return data;
}

export async function getComments({ postId }) {
  if (!postId) return;
  const { data, error, count } = await supabase
    .from(COMMENTS_TABLE_NAME)
    .select(`*,${USER_TABLE_NAME}(*),${POSTS_TABLE_NAME}(*)`, {
      count: "exact",
    })
    .eq("postId", postId)
    .order("created_at", { ascending: false });
  if (error) {
    if (error.code === "400") {
      return [];
    }
    throwError(error.message, error.code);
  }

  return { data, count };
}

export async function savePost({ postId, userId }) {
  const { data, error } = await supabase
    .from(SAVED_POSTS_TABLE_NAME)
    .insert({ postId, userId })
    .select()
    .single();
  if (error) {
    throwError(error.message, error.code);
  }
  return data;
}
export async function unsavePost({ postId, userId }) {
  const { error } = await supabase
    .from(SAVED_POSTS_TABLE_NAME)
    .delete()
    .eq("postId", postId)
    .eq("userId", userId);

  if (error) {
    throwError(error.message, error.code);
  }
}
export async function getSaved({ id, isPost }) {
  if (!id) return [];
  const { data, error } = await supabase
    .from(SAVED_POSTS_TABLE_NAME)
    .select(`*,${USER_TABLE_NAME}(*),${POSTS_TABLE_NAME}(*)`)
    .eq(`${isPost ? "postId" : "userId"}`, id);
  if (error) {
    throwError(error.message, error.code);
  }

  if (!isPost) {
    const posts = await Promise.all([
      ...data.map((post) => {
        const { id } = post.posts;

        return getPostByPostId(id);
      }),
    ]);

    return posts.flat();
  } else {
    return data;
  }
}

export async function addComment({ obj }) {
  const { data, error } = await supabase
    .from(COMMENTS_TABLE_NAME)
    .insert(obj)
    .select();
  if (error) {
    throwError(error.message, error.code);
  }

  return data;
}

export async function editComment({ commentContent, id }) {
  const { data, error } = await supabase
    .from(COMMENTS_TABLE_NAME)
    .update({ commentContent, isEdited: true })
    .eq("id", id)
    .select();
  if (error) {
    throwError(error.message, error.code);
  }

  return data;
}

export async function deleteComment({ id }) {
  const { error } = await supabase
    .from(COMMENTS_TABLE_NAME)
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    throwError(error.message, error.code);
  }
}
