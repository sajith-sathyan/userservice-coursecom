export default function user(username, password, email, role,status, createdAt){
    return {
        getUserName :()=>username,
        getPassword :()=>password,
        getEmail:()=>email,
        getRole :()=>role,
        getStatus:()=>status,
        getCreatedAt:()=>createdAt
    }
}