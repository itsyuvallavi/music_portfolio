// Import optimized album cover images
import duelLogo from '../assets/images/albums/duel_logo.jpg';
import enPaixLogo from '../assets/images/albums/en_paix_logo.jpg';
import tfwLogo from '../assets/images/albums/tfw_logo.jpg';
import qcLogo from '../assets/images/albums/qc_logo.png';
import ziLogo from '../assets/images/albums/zi_logo.png';
import limboLogo from '../assets/images/albums/limbo_logo.jpg';
import fdLogo from '../assets/images/albums/fd_logo.jpg';
import bsdLogo from '../assets/images/albums/bsd_logo.png';
import lnLogo from '../assets/images/albums/ln_logo.png';
import famdLogo from '../assets/images/albums/famd_logo.png';
import wormLogo from '../assets/images/albums/worm_logo.png';
import oblLogo from '../assets/images/albums/obl_logo.png';
import LMLogo from '../assets/images/albums/lm_logo.jpg';
import MattelLogo from '../assets/images/albums/mattel_logo.png';
import SeaTexLogo from '../assets/images/albums/st_logo.jpg';
import PolkadotLogo from '../assets/images/albums/polkadot_logo.jpg';

// Import all audio files
import Duel from '../assets/music/Duel_Demo.mp3';
import EnPaix from '../assets/music/EnPaix_Demo.mp3';
import TFW from '../assets/music/TFW_Demo.mp3';
import QualityControl from '../assets/music/QC_Demo.mp3';
import Zagouri from '../assets/music/Zagouri_Demo.mp3';
import Limbo from '../assets/music/Limbo_Demo.mp3';
import FromDust from '../assets/music/FromDust_Demo.mp3';
import BSD from '../assets/music/BSD_Demo.mp3';
import LastNight from '../assets/music/LastNight_Demo.mp3';
import FamilyDistancing from '../assets/music/FDM_Demo.mp3';
import Worms from '../assets/music/Worms_Demo.mp3';
import Brotherhood from '../assets/music/Brotherhood_Demo.mp3';
import LikeMe from '../assets/music/LikeMe_Demo.mp3';
import DreamSquad from '../assets/music/DreamSquad_Demo.mp3';
import SeaTex from '../assets/music/SeaTex_Demo.mp3';
import Polkadot from '../assets/music/Polkadot_Demo.mp3';

const projectsData = [
  {
    id: 1,
    album: "The Duel",
    title: "The Duel",
    artist: "Yuval Lavi",
    year: "2024",
    type: "Single",
    style: "Sci-Fi, Western, Japanese-style",
    genre: "Cinematic Electronic",
    image: duelLogo,
    audioFile: Duel,
    featured: true,
    tracks: [
      {
        title: "The Duel",
        url: Duel,
        artist: "Yuval Lavi",
        duration: "3:45"
      }
    ]
  },
  {
    id: 2,
    album: "En Paix",
    title: "En Paix",
    artist: "Yuval Lavi",
    year: "2024",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic Pop",
    image: enPaixLogo,
    audioFile: EnPaix,
    featured: true,
    tracks: [
      {
        title: "En Paix",
        url: EnPaix,
        artist: "Yuval Lavi",
        duration: "4:12"
      }
    ]
  },
  {
    id: 3,
    album: "The Fisherman's Wife",
    title: "The Fisherman's Wife",
    artist: "Yuval Lavi",
    year: "2024",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Alternative Electronic",
    image: tfwLogo,
    audioFile: TFW,
    featured: true,
    tracks: [
      {
        title: "The Fisherman's Wife",
        url: TFW,
        artist: "Yuval Lavi",
        duration: "3:28"
      }
    ]
  },
  {
    id: 4,
    album: "Quality Control",
    title: "Quality Control",
    artist: "Yuval Lavi",
    year: "2023",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: qcLogo,
    audioFile: QualityControl,
    featured: false,
    tracks: [
      {
        title: "Quality Control",
        url: QualityControl,
        artist: "Yuval Lavi",
        duration: "3:56"
      }
    ]
  },
  {
    id: 5,
    album: "Zaguri Impreria",
    title: "Zaguri Impreria",
    artist: "Yuval Lavi",
    year: "2023",
    type: "Single",
    style: "Sci-Fi, Western, Japanese-style",
    genre: "Experimental Electronic",
    image: ziLogo,
    audioFile: Zagouri,
    featured: false,
    tracks: [
      {
        title: "Zaguri Impreria",
        url: Zagouri,
        artist: "Yuval Lavi",
        duration: "4:33"
      }
    ]
  },
  {
    id: 6,
    album: "Limbo",
    title: "Limbo",
    artist: "Yuval Lavi",
    year: "2023",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: limboLogo,
    audioFile: Limbo,
    featured: false,
    tracks: [
      {
        title: "Limbo",
        url: Limbo,
        artist: "Yuval Lavi",
        duration: "3:18"
      }
    ]
  },
  {
    id: 7,
    album: "From Dust",
    title: "From Dust",
    artist: "Yuval Lavi",
    year: "2023",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: fdLogo,
    audioFile: FromDust,
    featured: false,
    tracks: [
      {
        title: "From Dust",
        url: FromDust,
        artist: "Yuval Lavi",
        duration: "3:42"
      }
    ]
  },
  {
    id: 8,
    album: "Backseat Driver",
    title: "Backseat Driver",
    artist: "Yuval Lavi",
    year: "2023",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic Pop",
    image: bsdLogo,
    audioFile: BSD,
    featured: false,
    tracks: [
      {
        title: "Backseat Driver",
        url: BSD,
        artist: "Yuval Lavi",
        duration: "3:25"
      }
    ]
  },
  {
    id: 9,
    album: "Last Night",
    title: "Last Night",
    artist: "Yuval Lavi",
    year: "2022",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: lnLogo,
    audioFile: LastNight,
    featured: false,
    tracks: [
      {
        title: "Last Night",
        url: LastNight,
        artist: "Yuval Lavi",
        duration: "3:51"
      }
    ]
  },
  {
    id: 10,
    album: "Family Distancing",
    title: "Family Distancing",
    artist: "Yuval Lavi",
    year: "2022",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: famdLogo,
    audioFile: FamilyDistancing,
    featured: false,
    tracks: [
      {
        title: "Family Distancing",
        url: FamilyDistancing,
        artist: "Yuval Lavi",
        duration: "4:07"
      }
    ]
  },
  {
    id: 11,
    album: "Worms",
    title: "Worms",
    artist: "Yuval Lavi",
    year: "2022",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: wormLogo,
    audioFile: Worms,
    featured: false,
    tracks: [
      {
        title: "Worms",
        url: Worms,
        artist: "Yuval Lavi",
        duration: "3:15"
      }
    ]
  },
  {
    id: 12,
    album: "Our Brotherly Love",
    title: "Our Brotherly Love",
    artist: "Yuval Lavi",
    year: "2022",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: oblLogo,
    audioFile: Brotherhood,
    featured: false,
    tracks: [
      {
        title: "Our Brotherly Love",
        url: Brotherhood,
        artist: "Yuval Lavi",
        duration: "3:38"
      }
    ]
  },
  {
    id: 13,
    album: "Like Me",
    title: "Like Me",
    artist: "Yuval Lavi",
    year: "2021",
    type: "Single",
    style: "Upbeat, Rap",
    genre: "Hip-Hop Electronic",
    image: LMLogo,
    audioFile: LikeMe,
    featured: true,
    tracks: [
      {
        title: "Like Me",
        url: LikeMe,
        artist: "Yuval Lavi",
        duration: "2:58"
      }
    ]
  },
  {
    id: 14,
    album: "Mattel",
    title: "Mattel",
    artist: "Yuval Lavi",
    year: "2021",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic Pop",
    image: MattelLogo,
    audioFile: DreamSquad,
    featured: true,
    tracks: [
      {
        title: "Mattel",
        url: DreamSquad,
        artist: "Yuval Lavi",
        duration: "3:33"
      }
    ]
  },
  {
    id: 15,
    album: "SeaTex",
    title: "SeaTex",
    artist: "Yuval Lavi",
    year: "2021",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: SeaTexLogo,
    audioFile: SeaTex,
    featured: false,
    tracks: [
      {
        title: "SeaTex",
        url: SeaTex,
        artist: "Yuval Lavi",
        duration: "4:22"
      }
    ]
  },
  {
    id: 16,
    album: "Polkadot",
    title: "Polkadot",
    artist: "Yuval Lavi",
    year: "2024",
    type: "Single",
    style: "Upbeat, Energetic",
    genre: "Electronic",
    image: PolkadotLogo,
    audioFile: Polkadot,
    featured: true,
    tracks: [
      {
        title: "Polkadot",
        url: Polkadot,
        artist: "Yuval Lavi",
        duration: "3:30"
      }
    ]
  }
];

export default projectsData;