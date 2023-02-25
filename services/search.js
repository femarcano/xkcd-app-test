// For the search only version
import algoliasearch from 'algoliasearch/lite'

const APP_ID = process.env.APP_ID
const APP_KEY = process.env.APP_KEY
const client = algoliasearch(APP_ID, APP_KEY)
const index = client.initIndex('xkcd_comic')

const CACHE = {}

export const search = async ({ query }) => {
  console.log(query)
  if (CACHE[query]) {
    console.log('data from Cache')
    return { results: CACHE[query] }
  }
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt', 'height', 'width'],
    hitsPerPage: 10,
  })
  console.log('data from Algolia')
  CACHE[query] = hits
  return { results: hits }
}
