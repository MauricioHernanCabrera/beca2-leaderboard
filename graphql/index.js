import gql from "graphql-tag";

const GET_AXIES_BY_ID = ids => {
  const queries = ids.map(id => {
    return `_${id}: axie(axieId: $axie${id}) {
  id
  class
  image
  breedCount
  stage
  genes
  sireId
  matronId
  auction {
    currentPriceUSD
  }
  children {
    id
    name
    class
    image
    title
    stage
    __typename
  }
  __typename
}`;
  });

  const query = gql`query GetAxie(${ids
    .map(id => `$axie${id}: ID!`)
    .join(", ")}) {
${queries.join(", \n")}
}`;

  const variables = ids.reduce((prev, current) => {
    return {
      ...prev,
      [`axie${current}`]: String(current)
    };
  }, {});

  return {
    query,
    variables
  };
};

const GET_AXIE_BY_ID = id => {
  const query = gql`
    query GetAxieBriefList2 {
      axie(axieId: ${id}) {
        id
        class
        image
        breedCount
        stage
        genes
        sireId
        stats {
          hp
          speed
          skill
          morale
        }
        parts {
          id
          name
          class
          type
          specialGenes
          stage
          abilities {
            id
            name
            attack
            defense
            energy
            description
            backgroundUrl
            effectIconUrl
            __typename
          }
        }
        matronId
        auction {
          currentPriceUSD
        }
        children {
          id
          name
          class
          image
          title
          stage
          __typename
        }
        __typename
      }
    }
  `;

  const variables = {};

  return {
    query,
    variables
  };
};

const FORMAT_AXIES_BY_ID = data =>
  Object.entries(data).map(([key, value]) => value);

const GET_AXIES_OWNER = gql`
  query GetAxieBriefList(
    $auctionType: AuctionType
    $criteria: AxieSearchCriteria
    $from: Int
    $sort: SortBy
    $size: Int
    $owner: String
  ) {
    axies(
      auctionType: $auctionType
      criteria: $criteria
      from: $from
      sort: $sort
      size: $size
      owner: $owner
    ) {
      total
      results {
        id
        owner
        image
        __typename
      }
      __typename
    }
  }
`;

const GET_AXIE_BRIEF_LIST = gql`
  query GetAxieBriefList(
    $auctionType: AuctionType
    $criteria: AxieSearchCriteria
    $from: Int
    $sort: SortBy
    $size: Int
    $owner: String
  ) {
    axies(
      auctionType: $auctionType
      criteria: $criteria
      from: $from
      sort: $sort
      size: $size
      owner: $owner
    ) {
      total
      results {
        id
        name
        stage
        class
        breedCount
        image
        title
        battleInfo {
          banned
          __typename
        }
        auction {
          currentPrice
          currentPriceUSD
          __typename
        }
        parts {
          id
          name
          class
          type
          specialGenes
          __typename
        }
        __typename
        __typename
      }
      __typename
    }
  }
`;

const GET_PARTS = parts => {
  const queries = parts
    .map((partItem, index) => {
      const partName = partItem.replaceAll("-", "_");
      return `
        ${partName}: axies(criteria: { parts: ["${partItem}"] }, from: 0, size: 1) {
          results {
            parts {
              id
              name
              class
              type
              specialGenes
              stage
              abilities {
                id
                name
                attack
                defense
                energy
                description
                backgroundUrl
                effectIconUrl
                __typename
              }
            }
          }
        }
      `;
    })
    .join("");

  const query = gql`
    query GetAxieBriefList {
      ${queries}
    }
    `;

  return {
    query,
    variables: {}
  };
};

const FORMAT_PARTS = (data, parts) => {
  return parts.map(partItem => {
    const partName = partItem.replaceAll("-", "_");

    const [axieItem] = data[partName].results;

    if (!axieItem) {
      return null;
    }

    return axieItem.parts.find(({ id }) => id === partItem);
  });
};

export {
  GET_AXIES_BY_ID,
  FORMAT_AXIES_BY_ID,
  GET_AXIES_OWNER,
  GET_AXIE_BRIEF_LIST,
  GET_PARTS,
  FORMAT_PARTS,
  GET_AXIE_BY_ID
};
