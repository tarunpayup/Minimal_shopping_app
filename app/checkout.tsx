import RazorpayCheckout from 'react-native-razorpay';

const handleCheckout = async()=>{
    try{
        const response = await fetch("https://www.tarunbansal.co.in/android/react/razorpay.php",{
            method:"POST",
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            body:"amount=${totalAmount}"
        });
        const order = await response.json();

        //Step:2 Razorpay Options

        var options = {
            description:"Shopping cart payment",
            image:"",
            currency:"INR",
            key:"rzp_live_EWrg6XAXfaC1ZM",
            amount:order.amount,
            order_id:order.id,
            name:"XYZ",
            prefill:{
                email:"abc@gmail.com",
                contact:"9876543210",
                name:"Customer"
            }
        };

        //Step:3 - Open checkout page
        RazorpayCheckout.open(options).then((data)=> {
            //Payment Successful
            alert("Success : ${data.razorpay_payment_id");

        }).catch((error)=>{
            //Payment failed
            alert("Error:${error.code}")
        });



    }catch(err){
        console.error("Checkout Error",err)
    }
}