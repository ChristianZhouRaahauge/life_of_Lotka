    for(var i=1; i<rows-1;i++){
        sumprey[i][0]=0;
        sumprey[i][cols-1]=0;
        sumpredator[i][0]=0;
        sumpredator[i][cols-1]=0;
        for(var k=-1; k<2; k++){
            sumprey[i][0]+=currprey[i+k][cols-1]+currprey[i+k][0]+currprey[i+k][1];
            sumprey[i][cols-1]+=currprey[i+k][0]+currprey[i+k][cols-1]+currprey[i+k][cols-2];
            sumpredator[i][0]+=currpredator[i+k][cols-1]+currpredator[i+k][0]+currpredator[i+k][1];
            sumpredator[i][cols-1]+=currpredator[i+k][0]+currpredator[i+k][cols-1]+currpredator[i+k][cols-2];
        }
        
    }
    //and the edge along the other direction
     for(var j=1; j<cols-1;j++){
        sumprey[0][j]=0;
        sumprey[rows-1][j]=0;
        sumpredator[0][j]=0;
        sumpredator[rows-1][j]=0;
        for(var k=-1; k<2; k++){
            sumprey[0][j]+=currprey[rows-1][j+k]+currprey[0][j+k]+currprey[1][j+k];
            sumprey[rows-1][j]+=currprey[0][j+k]+currprey[rows-1][j+k]+currprey[rows-2][j+k];
            sumpredator[0][j]+=currpredator[rows-1][j+k]+currpredator[0][j+k]+currpredator[1][j+k];
            sumpredator[rows-1][j]+=currpredator[0][j+k]+currpredator[rows-1][j+k]+currpredator[rows-2][j+k];
            
            
        }
        
    }

    //and the corners. ugly ugly code here
 //   sumprey[0][0]=currprey[rows-1][cols-1]+currprey[0][cols-1]+currprey[1][cols-1]+currprey[rows-1][0]+currprey[0][0]+currprey[1][0]+currprey[rows-1][1]+currprey[0][1]+currprey[1][1];
 //   sumpredator[0][0]=currpredator[rows-1][cols-1]+currpredator[0][cols-1]+currpredator[1][cols-1]+currpredator[rows-1][0]+currpredator[0][0]+currpredator[1][0]+currpredator[rows-1][1]+currpredator[0][1]+currpredator[1][1];
 //   sumprey[rows-1][0]=currprey[rows-2][cols-1]+currprey[rows-1][cols-1]+currprey[0][cols-1]+currprey[rows-1][0]+currprey[0][0]+currprey[1][0]+currprey[rows-1][1]+currprey[0][1]+currprey[1][1];
    