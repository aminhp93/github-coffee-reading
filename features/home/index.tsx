import supabase from "@/@core/services/supabase";
import axios from "axios";
import { useEffect, useState } from "react";

// const LIST_RESOURCES = [
//   {
//     key: "medium",
//     url: "https://medium.com/",
//   },
//   {
//     key: "devTo",
//     url: "https://dev.to/",
//   },
//   {
//     key: "youtube",
//     url: "https://www.youtube.com/",
//   },
//   {
//     key: "dailyDev",
//     url: "https://daily.dev/",
//   },
// ];

type Reading = any;

const Home = () => {
  const [listReading, setListReading] = useState<Reading[]>([]);
  useEffect(() => {
    const init = async () => {
      // let { data: checking, error } = await supabase
      //   .from("checking")
      //   .select("*");
      // setListReading(checking);
    };
    init();
  }, []);

  const handleTest = async () => {
    const response = await axios.post(
      "https://api.daily.dev/graphql",
      {
        query:
          '\n  query Feed(\n    $loggedIn: Boolean! = false\n    $refresh: Boolean = false\n    $first: Int\n    $after: String\n    $ranking: Ranking\n    $version: Int\n    $supportedTypes: [String!] = ["article","share","freeform","video:youtube","collection"]\n  ) {\n    page: feed(\n      first: $first\n      after: $after\n      ranking: $ranking\n      version: $version\n      supportedTypes: $supportedTypes\n      refresh: $refresh\n    ) {\n      ...FeedPostConnection\n    }\n  }\n  \n  fragment FeedPostConnection on PostConnection {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        ...FeedPost\n        contentHtml\n        ...UserPost @include(if: $loggedIn)\n      }\n    }\n  }\n  \n  fragment FeedPost on Post {\n    ...SharedPostInfo\n    sharedPost {\n      ...SharedPostInfo\n    }\n    trending\n    feedMeta\n    collectionSources {\n      handle\n      image\n    }\n    numCollectionSources\n    updatedAt\n    slug\n  }\n  \n  fragment SharedPostInfo on Post {\n    id\n    title\n    titleHtml\n    image\n    readTime\n    permalink\n    commentsPermalink\n    summary\n    createdAt\n    private\n    upvoted\n    commented\n    bookmarked\n    views\n    numUpvotes\n    numComments\n    videoId\n    bookmark {\n      remindAt\n    }\n    scout {\n      ...UserAuthor\n    }\n    author {\n      ...UserAuthor\n    }\n    type\n    tags\n    source {\n      ...SourceBaseInfo\n    }\n    downvoted\n    flags {\n      promoteToPublic\n    }\n    userState {\n      vote\n      flags {\n        feedbackDismiss\n      }\n    }\n    slug\n    domain\n  }\n  \n  fragment SourceBaseInfo on Source {\n    id\n    active\n    handle\n    name\n    permalink\n    public\n    type\n    description\n    image\n    membersCount\n    privilegedMembers {\n      user {\n        id\n      }\n      role\n    }\n    category {\n      id\n      title\n    }\n    currentMember {\n      ...CurrentMember\n    }\n    memberPostingRole\n    memberInviteRole\n  }\n  \n  fragment CurrentMember on SourceMember {\n    user {\n      id\n    }\n    permissions\n    role\n    referralToken\n    flags {\n      hideFeedPosts\n      collapsePinnedPosts\n    }\n  }\n\n\n  \n  fragment UserAuthor on User {\n    ...UserShortInfo\n    contentPreference {\n      ...ContentPreferenceFragment\n    }\n  }\n  \n  fragment ContentPreferenceFragment on ContentPreference {\n    referenceId\n    type\n    status\n  }\n\n  \n  fragment UserShortInfo on User {\n    id\n    name\n    image\n    permalink\n    username\n    bio\n    createdAt\n    reputation\n    companies {\n      name\n      image\n    }\n  }\n\n\n\n\n  \n  fragment UserPost on Post {\n    read\n    upvoted\n    commented\n    bookmarked\n    downvoted\n  }\n\n\n',
        variables: {
          version: 43,
          ranking: "POPULARITY",
          first: 9,
          after: "OQ==",
          loggedIn: true,
        },
      },
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr;q=0.6",
          "content-language": "en",
          "content-type": "application/json",
          cookie:
            "ilikecookies=true; da2=m654G1DMv97nUoBYvmQEP; das=KItBaqNoqXAdK4XEuUUPm; _vwo_uuid_v2=D52A013FC7C7C5089A13EC3C7A8E5A579|2f2bab12634e298b1d2cdc8a6e0f03ad; _ga=GA1.1.1915872537.1667824417; _ga_Y94RMTGW0M=GS1.1.1714358669.3.0.1714358669.0.0.0; ory_kratos_session=MTcyNjM2NjE2NnxxT3k5TGhyOUxkWGpuaVdBM3NDcnZIZGtSem9yX3Y4dldkOGhTQkczSzdLejViMHVNemhHNkJybG5OTldGS0N3Rl9neUFJYzVXUmp4OTdwUUlFZ01acV9lZWRqTm5OWHdsYmlsT1AwVlNaSTZYOWc0TnJwT1Bkb1k5dnNZLVB5ZmtFa1VEMTU3Vk9CVzh6aENJQ016eGVJa2NfUEZSNjlzT1V5ckFaTGhyYU1RVmdRUXRGMzlpMks3X1RjaUdJMGFRYzNPVzlPcTByOWFNS0taR2h1U0czeGdBMktkV1lKSVF1OWY2Vk53VnZHUzBvLWZFaUJvMHBzYjNvVE8wQWZ6d2pBcjdvaz18vyJbKQGLAnix6vWb6K_oei4re2V9swMj0Dq3LHHS9s4=; usprivacy=%7B%22uspString%22%3A%221YN-%22%2C%22firstAcknowledgeDate%22%3A%222024-02-23T01%3A53%3A34.561Z%22%2C%22optOutDate%22%3Anull%7D; _gcl_au=1.1.1245156500.1727509946; _fbp=fb.1.1727509945747.151496955156128269; _ga_88PBR8PHX0=GS1.1.1727509945.4.0.1727509948.0.0.0; da3=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjc1MTIzNDYuMTQ3LCJ1c2VySWQiOiJtNjU0RzFETXY5N25Vb0JZdm1RRVAiLCJyb2xlcyI6W10sImlhdCI6MTcyNzUxMTQ0NiwiYXVkIjoiRGFpbHkiLCJpc3MiOiJEYWlseSBBUEkifQ.JHXyS7hX4YsoJaeGS6XS5WctKoe8Nkm5F9j0hbiIZ2YbVw5KS0zIl3ceHoTkgEVk_lnfbu2y9b2-3SWFSkbrD4GF4jfF4D-E6ECq3e8Svi-9SCl6GsPTFlL7kTbyBp2LZP-bxiQoz7iKlkz1gaJNoMeig3gu8QNFRW5yQFIkQ4DgHEmAm2Zvp51MLmyDJhGtwIK1HvI1y8-W-jt7EwovIq-KV0OfhW5_BOhE2oYGUT3zjEkEal4xkKeCjCYpDTi45xIxwPiXb3Z-9Tu4MSGnlgyyoediK2g0S-Yjoknq5Yop4Z4YYVALNdAUw9hC9Qvy6JHumFmcMrR_WkcumSB59A.6sU8avYN46mjSESZfw4Fw4lxFWWyO5wMrizM0AIgLK4",
          origin: "https://app.daily.dev",
          priority: "u=1, i",
          referer: "https://app.daily.dev/",
          "sec-ch-ua":
            '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
      }
    );
  };

  return (
    <div>
      <div>List</div>
      {listReading.map((item) => {
        return (
          <div key={item.title}>
            <div>{item.title}</div>
          </div>
        );
      })}

      <div>Test daily.dev</div>
      <div onClick={() => handleTest()}>Click test</div>
    </div>
  );
};

export default Home;
