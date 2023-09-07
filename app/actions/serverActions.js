"use server";

import { revalidateTag } from "next/cache";

export const addRecipe = async (postDetails, loginDetails) => {
    const token = await getJWTToken(loginDetails);
    const imageId = await addImage(postDetails.meal_image, token);

    const post = {
        title: postDetails.title,
        status: 'publish',
        featured_media: imageId,
        acf: {...postDetails, meal_image: imageId}
    }

    await fetch(`${process.env.NEXT_PUBLIC_URL}/wp-json/wp/v2/posts`, {
        cache: "no-cache",
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    revalidateTag('posts');
}

const addImage = async (image, token) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/wp-json/wp/v2/media`,{ 
        cache: "no-cache",
        method: 'POST',
        body: image,
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    });
    
    const data = await res.json();
    return data.id;
}

const getJWTToken = async (loginDetails) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/wp-json/jwt-auth/v1/token`, {
        cache: "no-cache",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: loginDetails.username,
            password: loginDetails.password
        })
    });

    const data = await response.json()
    
    if (data && data.token) {
      return data.token;
    } else {
      throw new Error('Failed to authenticate');
    }
};

export const signUp = async (signUpDetails, authKey) => {
    const apiUrl = `https://recipes-for-food.000webhostapp.com/?rest_route=/simple-jwt-login/v1/users&email=${signUpDetails.email}&password=${signUpDetails.password}&AUTH_KEY=${authKey}`
  
    const response = await fetch(apiUrl, {
      cache: "no-cache",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpDetails)
    });

    const data = await response.json();
  
    return data;
};

export const auth = async (loginDetails) => {
    const apiUrl = `https://recipes-for-food.000webhostapp.com/?rest_route=/simple-jwt-login/v1/auth&username=${loginDetails.username}&password=${loginDetails.password}`
  
    const response = await fetch(apiUrl, {
      cache: "no-cache",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDetails)
    });

    const data = await response.json();
  
    return data;
};

export const logOut = async (jwt) => {
    const apiUrl = `https://recipes-for-food.000webhostapp.com/?rest_route=/simple-jwt-login/v1/auth/revoke`
  
    const response = await fetch(apiUrl, {
      cache: "no-cache",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
    });

    const data = await response.json();
  
    return data;
};

export const logIn = async (jwt) => {
  const response = await fetch(`https://recipes-for-food.000webhostapp.com/?rest_route=/simple-jwt-login/v1/autologin`, {
    cache: "no-cache",
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`
    },
  });

  const data = await response.json();

  return data;
};

export const validate = async (jwt) => {
  const response = await fetch(`https://recipes-for-food.000webhostapp.com/?rest_route=/simple-jwt-login/v1/auth/validate`, {
    cache: "no-cache",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
  });

  const data = await response.json();

  return data;
};