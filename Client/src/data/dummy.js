import { FaPray } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { IoBookmarks } from "react-icons/io5";

export const links = [
  {
    title: "Mosque Nearby",
    link: "",
    icon: <FaPray />,
    isProtected: false,
    roles: [1000],
  },
  {
    title: "Prayer Limit",
    link: "prayerlimit",
    icon: <FaPray />,
    isProtected: false,
    roles: [1000],
  },
  {
    title: "Bookmarks",
    link: "bookmark",
    icon: <IoBookmarks />,
    isProtected: false,
    roles: [1000],
  },
  // {
  //   title: "Map",
  //   link: "map",
  //   icon: <FaMap />,
  //   isProtected: false,
  //   roles: [1000],
  // },
  {
    title: "Admin",
    link: "admin",
    icon: <RiAdminFill />,
    isProtected: true,
    roles: [5150],
  },
  {
    title: "Request Handler",
    link: "requesthandler",
    icon: <RiAdminFill />,
    isProtected: true,
    roles: [5150],
  },
  {
    title: "Edit Namaz Time",
    link: "edit",
    icon: <FiEdit />,
    isProtected: true,
    roles: [1000],
  },
  {
    title: "Add New User",
    link: "adminregister",
    icon: <RiAdminFill />,
    isProtected: true,
    roles: [5150],
  },
  {
    title: "Profile",
    link: "profile",
    icon: <RiAdminFill />,
    isProtected: true,
    roles: [1000],
  },
];

export const country = [
  {
    id: 1,
    name: "India",
  },
  {
    id: 2,
    name: "UK",
  },
  {
    id: 3,
    name: "Austratia",
  },
  {
    id: 4,
    name: "USA",
  },
  {
    id: 5,
    name: "Russia",
  },
];

export const city = [
  {
    id: 1,
    name: "Mumbai",
  },
  {
    id: 2,
    name: "Delhi",
  },
  {
    id: 3,
    name: "Jammu",
  },
  {
    id: 4,
    name: "Kashmir",
  },
  {
    id: 5,
    name: "Pune",
  },
  {
    id: 6,
    name: "Hydrabad",
  },
  {
    id: 7,
    name: "Chennai",
  },
  {
    id: 8,
    name: "Kolkatta",
  },
  {
    id: 9,
    name: "Surat",
  },
  {
    id: 10,
    name: "Jaipur",
  },
  {
    id: 11,
    name: "London",
  },
  {
    id: 12,
    name: "Sydney",
  },
  {
    id: 13,
    name: "New York",
  },
  {
    id: 14,
    name: "Moscow",
  },
];

export const method = [
  {
    id: 1,
    name: "University of Islamic Sciences, Karachi",
  },
  {
    id: 0,
    name: "Shia Ithna-Ansari",
  },
  {
    id: 2,
    name: "Islamic Society of North America",
  },
  {
    id: 3,
    name: "Muslim World League",
  },
  {
    id: 4,
    name: "Umm Al-Qura University, Makkah",
  },
  {
    id: 5,
    name: "Egyptian General Authority of Survey",
  },
  {
    id: 6,
    name: "Islamic Society of North America (ISNA)",
  },
  {
    id: 7,
    name: "Institute of Geophysics, University of Tehran",
  },
  {
    id: 8,
    name: "Gulf Region",
  },
  {
    id: 9,
    name: "Kuwait",
  },
  {
    id: 10,
    name: "Qatar",
  },
  {
    id: 11,
    name: "Majlis Ugama Islam Singapura, Singapore",
  },
  {
    id: 12,
    name: "Union Organization islamic de France",
  },
  {
    id: 13,
    name: "Diyanet İşleri Başkanlığı, Turkey",
  },
  {
    id: 14,
    name: "Spiritual Administration of Muslims of Russia",
  },
];

export const school = [
  {
    id: 1,
    name: "Hanafi",
  },
  {
    id: 0,
    name: "Shafi",
  },
];
