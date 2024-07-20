/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images:{
      domains:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF827oX776lXpSwVIAu4iuMBeo6Zdo8Y_T0A&s','lh3.googleusercontent.com',
    'firebasestorage.googleapis.com', "avatars.githubusercontent.com"]
    }   
  }

module.exports = nextConfig
