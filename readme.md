#   to run this project:
npm install
npm start

#   Final url will be like below:
#   http://localhost:3000/repositories?q=language:javascript&date=created:>2020-10-12&sort=stars&order=desc&per_page=10

#   During this task I tried to make filters work independantly in seperate class
#   Any new filter to be added should be added with minimum chnage of existing code
#   Though there should have been lot of unit tests but could not manage due to time
#   As the query params are mostly string, so lot of effort spent on Error handling  and report the error place