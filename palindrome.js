let palindrome = "ada"
let count=0
for ( i=0 ; i<palindrome.length ; i++){
    if(palindrome[i]==palindrome[palindrome.length-1-i]){
        count++
    }
}

if(count==palindrome.length){
    console.log("yes")
}else{
 
    console.log("no")
}