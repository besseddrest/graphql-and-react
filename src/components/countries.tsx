"use client";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client"
import { useState } from "react";

// 1. initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

// 2. write a GraphQL query for names and codes of all countries
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`
// 3. create an interface
interface Country {
  name: string,
  code: string
}

// define component
export default function Countries() {
  const [country, setCountry] = useState('');
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});
  
  if (loading || error) {
    return <p>{ error ? error.message : 'Loading...' }</p>
  }
  
  return (
    <div className="container space-y-12">
      <h1>Countries Form</h1>
      <form>
        <div className="col-span-full">
          <label className="block text-sm font-medium">Select a Country</label>
          <div className="mt-2">
            <select title="country-select" className="block w-full rounded-md border-0" value={ country } onChange={ event => setCountry(event.target.value) }>
              { data.countries.map((country: Country, i: number) => (
                <option key={i} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <p>
        This component queries `countries.trevorblades.com` for a list of countries via GraphQL, then displays each country as an option in a select list.
      </p>
    </div>
  )
}