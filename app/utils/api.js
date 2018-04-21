import { axios } from 'axios'

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`

async function getProfile (username) {
  try {
    const profile = await fetch(`https://api.github.com/users/${username}${params}`)
    return profile.json()
  } catch(error) {
    console.log(error)
  }
}

async function getRepos (username) {
  const repos = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
  return repos.json()
}

function getStarCount (repos) {
  return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0);
}

function calculateScore ({followers}, repos) {
  const totalStars = getStarCount(repos);
  return (followers * 3) + getStarCount(repos);
}

function handleError (error) {
  console.warn(error);
  return null;
}

async function getUserData (player) {
  const [ profile, repos ] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ])
  
  return {
    profile: profile,
    score: calculateScore(profile, repos)
  }
}

function sortPlayers (players) {
  return players.sort((a,b) => b.score - a.score);
}


export async function battle(players ){
    const results = await Promise.all(players.map(getUserData))
    .catch(handleError)
    return results === null
    ? results
    : sortPlayers(results)
  }

export async function fetchPopularRepos(language) {
  try {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    const repos = await fetch(encodedURI)
    const ghRepos = await repos.json()
    return ghRepos.items
  } catch (err){
    console.warn(err)
  }
}
