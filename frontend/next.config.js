/** @type {import('next').NextConfig} */
const nextConfig = {
  //  rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3000/api/:path*",
  //     },
  //   ];
  // },
  
  reactStrictMode: false,
  webpack(config,{isServer}) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    // if(!isServer){
    //   // config.node={dns:'empty'}
    //   config.resolve.fallback.fs = false
    //   config.resolve.fallback.dns = false
    //   config.resolve.fallback.net = false
    // }
    
    return config},


}

module.exports = nextConfig

// module.exports=(phase,{defaultConfig})=>{

//   const rewrites=()=>{
//     return [
//       {
//         source: "/api/:path*",
//         destination: "http://localhost:8000/api/:path*",
//       }
//     ]
//   }

//   return {rewrites}
// }
