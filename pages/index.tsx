import type { NextPage } from 'next'
import {useQuery,gql} from "@apollo/client";
import Link from "next/link";

const Home: NextPage = () => {
  const GetArticles = gql`
    query GetArticles {
      articles {
        content
        ref
        title
        summary
      }
    }
  `;
  const {loading,error,data} = useQuery(GetArticles);  
  return (
   
    <div className="container">    
      {
        loading ? (
          <h2>Loading</h2>
        ) : (
          error ? (
            <h2>{error.message}</h2>
          ) : (
            data.articles.map((article:any,index:any) => {
              return (
                <div key={index}>
                  <Link href={`/posts/${article['ref']}`}>
                    <a>{article['title']}</a>
                    </Link>
                  <p>{article['summary']}</p>
                </div>
              )
            })
          )
        )
      }
      <style jsx>{`
        .container {
          margin-top: 2rem;
          width:60%;
          margin: 0px auto;
          padding:2rem 0px;
        }
        .container a{
          font-weight:bold;
        }
      `}</style>
    </div>
  )
}
export default Home;