let palindrome = "ada"
let c=0
for ( i=0 ; i<palindrome.length ; i++){
    if(palindrome[i]==palindrome[palindrome.length-1-i]){
        c++
    }
}

if(c==palindrome.length){
    console.log("yes")
}else{
 
    console.log("no")
}
