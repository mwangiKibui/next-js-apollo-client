import React from 'react'
import {GetStaticProps} from 'next';
import {gql} from "@apollo/client";
import {getApolloClient} from "../../lib/apollo-client";
import { ParsedUrlQuery } from 'querystring';

const GET_ARTICLE = gql`
    query GetArticle($articleId: ID) {
        article(id: $articleId) {
            content
            title
            summary
        }
    }
`;

const GET_ARTICLES = gql`
    query GetArticles {
    articles {
        ref
    }
    }
`;

interface Iprops{
    article:any
}

export default function Post({article}:Iprops) {
    return (
        <div className="container">
            <h3>{article['title']}</h3>

            <h5>{article['summary']}</h5>

            <p>{article['content']}</p>

            <style jsx>{`
            .container {
                margin-top: 2rem;
                width:60%;
                margin: 0px auto;
                padding:2rem 0px;
                }`}
            </style>

        </div>
    )
}

interface Iparams extends ParsedUrlQuery {
    ref:string
}


export const  getStaticProps:GetStaticProps = async  (context) => {
    const {ref} = context['params'] as Iparams;
    const apolloClient = getApolloClient();
    const {data} = await apolloClient.query({
        query:GET_ARTICLE,
        variables:{
            "articleId":ref
        }
    });
    return {
        props:{
            "article":data['article']
        }
    }
}

export async function getStaticPaths(){
    const apolloClient = getApolloClient();
    const {data} = await apolloClient.query({
        query:GET_ARTICLES
    });
    const paths = data['articles'].map((article: any) => {
        return {
            params:{
                "ref" : article['ref']
            }
        }
    });
    return {
        paths,
        fallback:true
    }
}