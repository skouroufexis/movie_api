if(user==null) //user not logged in
      {    

          if(openregister==true) //user clicks 'Register' button
            {
              return(
                <RegistrationView backtologin={function(){
                  self.baktoLogin();
                }} />
              );
            }
          else 
            {
              
              return(
                <LoginView      
                  openregister={function(){
                      self.openRegister();
                  }}

                  onlogin={function(data){
                    self.login(data);
                  }}
                />
                );
            }
      }

    else //user is logged in
      { 
          if(movies==null) //movies not yet loaded
          {
            return(<div>loading</div>);
          }
          

          else if(movies!=null && selected==null) //movies loaded but user hasn't selected an individual movie
            {
              console.log(movies);
                return(
                 <div> 
                        {<Header
                          logout={function(){
                            self.logout();
                          }}
                          
                        
                        />}
                        <div className='container'>
                        
                        <div className='row'>
                        
                          {movies.map(movie=>
                            <MovieCard key={movie._id}
                                      title={movie.title}
                                      id={movie._id}  
                                      movie={movie}
                                      selected={movie=>this.selectedMovie(movie)}
                            />
                          )} 
                        </div> 
                        </div>  
                  </div>    
             )
            }
          else //user selected an individual movie
            {
              return (<MovieView
              movie={this.state.selected}
              back={goBack=>this.goBack()}
            />);
            }

      }