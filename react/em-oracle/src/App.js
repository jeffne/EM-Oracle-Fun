//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { PageContent } from "./components/PageContent";

function App() {
  return (
    <div className="App">
      {/*<CrudeOracleComponent team_1="Germany" team_2="Switzerland" /> */}

      <PageContent em2016Links={em2016Links} em20Links={em20Links} />
    </div>
  );
}

export default App;

const em20Links = [
  {
    title: "2021 Group Phase 1",
    url: "https://www.openligadb.de/api/getmatchdata/em20/2020/1",
  },
  {
    title: "2021 Group Phase 2",
    url: "https://www.openligadb.de/api/getmatchdata/em20/2020/2",
  },
  {
    title: "2021 Group Phase 3",
    url: "https://www.openligadb.de/api/getmatchdata/em20/2020/3",
  },
  {
    title: "2021 Quarter Finals",
    url: "https://www.openligadb.de/api/getmatchdata/em20/2020/4",
  },
  {
    title: "2021 Half Finals",
    url: "https://www.openligadb.de/api/getmatchdata/em20/2020/5",
  },
  {
    title: "2021 Finals",
    url: "https://www.openligadb.de/api/getmatchdata/em20/2020/6",
  },
];

const em2016Links = [
  {
    title: "2016 Group A",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/1",
  },
  {
    title: "2016 Group B",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/2",
  },
  {
    title: "2016 Group C",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/3",
  },
  {
    title: "2016 Group D",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/4",
  },
  {
    title: "2016 Group E",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/5",
  },
  {
    title: "2016 Group F",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/6",
  },
  {
    title: "2016 Final 8",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/7",
  },
  {
    title: "2016 Final 4",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/8",
  },
  {
    title: "2016 Final 2",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/9",
  },
  {
    title: "2016 Final",
    url: "https://www.openligadb.de/api/getmatchdata/em2016/2016/10",
  },
];
