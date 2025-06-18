// Import audio files directly (this will make Vite handle them properly)
import duelAudio from '../assets/audio/Duel_Demo.mp3';

// Import album logos with correct paths
import duelLogo from '../assets/images/albums/duel_logo.png';
import enPaixLogo from '../assets/images/albums/en_paix_logo.png';
import tfwLogo from '../assets/images/albums/tfw_logo.png';
import qcLogo from '../assets/images/albums/qc_logo.png';
import ziLogo from '../assets/images/albums/zi_logo.png';
import limboLogo from '../assets/images/albums/limbo_logo.png';
import fdLogo from '../assets/images/albums/fd_logo.png';
import bsdLogo from '../assets/images/albums/bsd_logo.png';
import lnLogo from '../assets/images/albums/ln_logo.png';
import famdLogo from '../assets/images/albums/famd_logo.png';
import wormLogo from '../assets/images/albums/worm_logo.png';
import oblLogo from '../assets/images/albums/obl_logo.png';
import LMLogo from '../assets/images/albums/lm_logo.jpg';
import MattelLogo from '../assets/images/albums/mattel_logo.png';
import SeaTexLogo from '../assets/images/albums/st_logo.png';

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
    audioFile: duelAudio, // Use imported audio file
    featured: true,
    tracks: [
      {
        title: "The Duel",
        url: "/assets/audio/Duel_Demo.wav",
        artist: "Yuval Lavi",
        duration: "3:45" // Will be replaced by actual duration
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
    audioFile: "/assets/audio/EnPaix_Demo.wav",
    featured: true,
    tracks: [
      {
        title: "En Paix",
        url: "/assets/audio/EnPaix_Demo.wav",
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
    audioFile: "/assets/audio/TFW_Demo.wav",
    featured: true,
    tracks: [
      {
        title: "The Fisherman's Wife",
        url: "/assets/audio/TFW_Demo.wav",
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
    audioFile: "/assets/audio/QC_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "Quality Control",
        url: "/assets/audio/QC_Demo.wav",
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
    audioFile: "/assets/audio/Zagouri_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "Zaguri Impreria",
        url: "/assets/audio/Zagouri_Demo.wav",
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
    audioFile: "/assets/audio/Limbo_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "Limbo",
        url: "/assets/audio/Limbo_Demo.wav",
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
    audioFile: "/assets/audio/FromDust_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "From Dust",
        url: "/assets/audio/FromDust_Demo.wav",
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
    audioFile: "/assets/audio/BSD_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "Backseat Driver",
        url: "/assets/audio/BSD_Demo.wav",
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
    audioFile: "/assets/audio/LastNight_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "Last Night",
        url: "/assets/audio/LastNight_Demo.wav",
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
    audioFile: "/assets/audio/FDM_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "Family Distancing",
        url: "/assets/audio/FDM_Demo.wav",
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
    audioFile: "/assets/audio/Worms_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "Worms",
        url: "/assets/audio/Worms_Demo.wav",
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
    audioFile: "/assets/audio/Brotherhood_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "Our Brotherly Love",
        url: "/assets/audio/Brotherhood_Demo.wav",
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
    audioFile: "/assets/audio/LikeMe_Demo.wav",
    featured: true,
    tracks: [
      {
        title: "Like Me",
        url: "/assets/audio/LikeMe_Demo.wav",
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
    audioFile: "/assets/audio/DreamSquad_Demo.wav",
    featured: true,
    tracks: [
      {
        title: "Mattel",
        url: "/assets/audio/DreamSquad_Demo.wav",
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
    audioFile: "/assets/audio/SeaTex_Demo.wav",
    featured: false,
    tracks: [
      {
        title: "SeaTex",
        url: "/assets/audio/SeaTex_Demo.wav",
        artist: "Yuval Lavi",
        duration: "4:22"
      }
    ]
  }
];

export default projectsData;