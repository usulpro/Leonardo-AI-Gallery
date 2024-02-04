import {
  Gallery,
  fetchGenerationsByUserId,
  fetchUserInfo,
} from 'leonardo-ai-gallery';
// import 'leonardo-ai-gallery/styles.css'
import '../../../node_modules/leonardo-ai-gallery/dist/styles.css';

const token = process.env.NEXT_PUBLIC_LEONARDO_API_TOKEN;

export default async function Home() {
  const user = await fetchUserInfo(token!);
  const generations = await fetchGenerationsByUserId({
    token: token!,
    offset: 0,
    limit: 9,
    userId: user.user.id,
  });
  return <Gallery token={token!} pages={3} limit={3} serverFetchedGenerations={generations}/>;
}
