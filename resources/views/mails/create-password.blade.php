@component('mail::message')

Join your team on Xecute
<br> 
Dear {{$fullname}},
<br> 
You have been invited to join your team on Xecute Quotes.
Click on the link below to setup your password and get started.
<br> 
<a href="{{ url('/') }}/create-password/{{$token}}">Click Here!</a>
<br>
Sincerely,<br>
Xecute Quote Team.

@endcomponent