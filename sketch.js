 var PLAY = 1;
 var END = 0;
 var WIN =2;
 var MENU = 3;
 var gameState = MENU;
 var bg;
 var prince;
 var castle,tower,shooter,fireball,Efireball;
 var tower2,shooter2;
 var ci,ti,si,fi,Prince_Left_run,Prince_Right_run,Prince_idle,prince_throw;
 var fbg;
 var edge;
 var sheild,javlinimg,javlin,jg;
 var plifes,tlifes,t2lifes;
 var blast,blast1;
 var enemy,enemy_Group,enemyA;
 var Tittle,tittle_img;
 var Play_button,PBI;
 var HTP_button,HTPi;
 var story_Button, stbi;
 var BlastS,KillS,Throw_FB_sound;
 var showstory = false;
 var showHTP = false;
 var story,storyimg;
 var htp,htpimg;
 var winSprite,winimg;
 var looseSprite,looseImg;
 var WinS,LooseS;
 var choice;
 function preload(){
 bg = loadImage("Images/Bg_Grass.png");
 ci = loadImage("Images/castle_img.png");
 ti  = loadImage("Images/Tower.png");
 si = loadImage("Images/shooter.png");
 fi = loadImage("Images/fireball.png");
 Prince_Right_run = loadAnimation("Images/Prince_Animations/Prince_facing_Right/Prince_Running/Run_1.png",
                                  "Images/Prince_Animations/Prince_facing_Right/Prince_Running/Run_2.png",
                                  "Images/Prince_Animations/Prince_facing_Right/Prince_Running/Run_3.png",
                                  "Images/Prince_Animations/Prince_facing_Right/Prince_Running/Run_4.png");

 Prince_Left_run = loadAnimation ("Images/Prince_Animations/Prince_facing_Left/Prince_Running/Run_1.png",
                                  "Images/Prince_Animations/Prince_facing_Left/Prince_Running/Run_2.png",
                                  "Images/Prince_Animations/Prince_facing_Left/Prince_Running/Run_3.png",
                                  "Images/Prince_Animations/Prince_facing_Left/Prince_Running/Run_4.png");
 
 Prince_idle = loadAnimation("Images/Prince_Animations/Prince_facing_Right/Prince_Idle/Idle_1.png",
                             "Images/Prince_Animations/Prince_facing_Right/Prince_Idle/Idle_2.png",
                             "Images/Prince_Animations/Prince_facing_Right/Prince_Idle/Idle_2.png");

 prince_throw = loadAnimation("Images/Prince_Animations/Prince_facing_Right/Prince_Throw/Throw_1.png",
                              "Images/Prince_Animations/Prince_facing_Right/Prince_Throw/Throw_2.png");

 sheild = loadImage("Images/sheild.png");
 javlinimg = loadImage("Images/javlin.png");
 blastA = loadAnimation("Images/Blast_Animation/Blast_1.png","Images/Blast_Animation/Blast_2.png",
                        "Images/Blast_Animation/Blast_3.png","Images/Blast_Animation/Blast_4.png",
                       "Images/Blast_Animation/Blast_5.png","Images/Blast_Animation/Blast_6.png",
                       "Images/Blast_Animation/Blast_7.png","Images/Blast_Animation/Blast_8.png");

 enemyA = loadAnimation("Images/Enemy_Animations/Enemy0.png","Images/Enemy_Animations/Enemy1.png",
                        "Images/Enemy_Animations/Enemy2.png","Images/Enemy_Animations/Enemy3.png",
                        "Images/Enemy_Animations/Enemy4.png","Images/Enemy_Animations/Enemy5.png",);

 BlastS = loadSound("Audio/Blast_sound.wav");
 KillS = loadSound("Audio/Kill_sound.wav");
 Throw_FB_sound = loadSound("Audio/Throw_FB_sound.wav");
 WinS = loadSound("Audio/Win.wav");
 LooseS = loadSound("Audio/Loss.wav");
 //MENU
 tittle_img = loadImage("Images/UI elements/Text Elements/Tittle.png");
 PBI = loadImage("Images/UI elements/Buttons/Play_Button.png");
 HTPi = loadImage("Images/UI elements/Buttons/How to play_Button.png");
 stbi = loadImage("Images/UI elements/Buttons/Story_Button.png");



 tittle_img = loadImage("Images/UI elements/Text Elements/Tittle.png");
 
 storyimg = loadImage("Images/UI elements/Text Elements/Story.png");
 htpimg = loadImage("Images/UI elements/Text Elements/HTP.png");

 winimg = loadImage("Images/UI elements/Text Elements/WIN1.png");
 looseImg = loadImage("Images/UI elements/Text Elements/LOOSE.png");

}
 
 function setup(){
     var canvas = createCanvas(windowWidth,windowHeight);
     castle = createSprite(windowWidth-100,windowHeight-150,20,20);
     castle.addImage("castle",ci);
     castle.scale = 1.5;
     castle.setCollider("circle", 0,0, 100);
     prince = createSprite(0,325);
     prince.addAnimation("prince",Prince_idle);

     prince.scale = 0.15;
     tower = createSprite(308,278,20,20);
     tower.addImage("tower",ti);
     tower.scale = 0.7;
     shooter = createSprite(tower.x+20,tower.y-2,20,20);
     shooter.addImage("shooter",si);
     shooter.scale = 0.4;

     tower2 = createSprite(508,278,20,20);
     tower2.addImage("tower",ti);
     tower2.scale = 0.7;
     shooter2 = createSprite(tower2.x+20,tower2.y-2,20,20);
     shooter2.addImage("shooter",si);
     shooter2.scale = 0.4;

     fbg = new Group();
     jg = new Group();
     enemy_Group = new Group();
     plifes = 5;
     tlifes = 5;
     t2lifes = 5;

     //Menu
     Tittle = createSprite(width/2,50,2,2);
     Tittle.addImage("tittle",tittle_img);
     Tittle.visible = false;
     Play_button = createSprite(width/2,(height/2-150)+50,2,2);
     Play_button.addImage("PB",PBI);
     Play_button.visible = false;
     story_Button = createSprite(width/2,(height/2)+50,2,2);
     story_Button.addImage("stbi",stbi);
     story_Button.visible = false;
     HTP_Button = createSprite(width/2,(height/2+150)+50,2,2);
     HTP_Button.addImage("htbi",HTPi);
     HTP_Button.visible = false;
     story = createSprite(width/2,height/2,20,20);
     story.addImage(storyimg);
     story.visible = false;
     htp = createSprite(width/2,height/2,20,20);
     htp.addImage(htpimg);
     htp.visible = false;

 }
 
 function draw(){
     background(bg);
     edge = createEdgeSprites();
     prince.bounceOff(edge);
     prince.velocityX = 0;
     prince.velocityY = 0;

     if(gameState===PLAY){
     prince.visible = true;
     enemy_Group.setvisibleEach = true;
     tower.visible = true;
     tower2.visible = true;

     if(shooter){
     shooter.visible = true;
     }
     if(shooter2){
        shooter2.visible = true;
    }
     Tittle.visible = false;
     story.visible = false;
     for (var i = 0; i<fbg.length; i++){
     if(prince.isTouching(fbg.get(i))){
        fbg.get(i).destroy();
         if(! keyIsDown(90)){
         death();
         }
     }
     }

     if(enemy_Group.length>0){
     for(var e = 0; e<enemy_Group.length; e++){
         for(var j = 0; j<jg.length; j++){
             if(jg.get(j).isTouching(enemy_Group.get(e))){
                 jg.get(j).destroy();
                 enemy_Group.get(e).destroy();
             }
         }
     }
}
for (var i = 0; i<jg.length; i++){
    if(tower.isTouching(jg.get(i))){
    jg.get(i).destroy();
    tlifes = tlifes-1;
    }
}

for (var i = 0; i<jg.length; i++){
    if(tower2.isTouching(jg.get(i))){
    jg.get(i).destroy();
    t2lifes = t2lifes-1;
    }
}

if(tlifes<=0){
    tower.destroy();
    if(shooter){
    shooter.destroy();
    
    shooter = null;
    blast1 = createSprite(tower.x,tower.y,10,10);
    blast1.addAnimation("blast",blastA);
    BlastS.play();
    blast1.lifetime = 25;
   }
}

if(t2lifes<=0){
    tower2.destroy();
    if(shooter2){
    shooter2.destroy();
    
    shooter2 = null;
    blast1 = createSprite(tower2.x,tower2.y,10,10);
    blast1.addAnimation("blast",blastA);
    BlastS.play();
    blast1.lifetime = 25;
   }
}

   if(shooter){
     shooter.pointTo(prince.x,prince.y);
    }

    if(shooter2){
        shooter2.pointTo(prince.x,prince.y);
       }

        for(var e = 0; e<enemy_Group.length; e++){
            if(prince.isTouching(enemy_Group.get(e))){
                death();
            }

            for(var j = 0; j<jg.length; j++){
                if(jg.get(j).isTouching(edge)){
                    jg.get(j).destroy();
                }
            }

            if(prince.isTouching(castle)){
                gameState = WIN;
            }
 }}
 else{
    if(gameState===END){
        enemy_Group.setVelocityEach(0,0);
        jg.destroyEach();
            LooseS.play();
    }
       else{
        if(gameState===WIN){
            enemy_Group.setVelocityEach(0,0);
            jg.destroyEach();
            WinS.play();
        } else{
         if(gameState===MENU){
            prince.visible = false;
            enemy_Group.setvisibleEach = false;
            tower.visible = false;
            tower2.visible = false;
            shooter.visible = false;
            shooter2.visible = false;
            Tittle.visible = true;
            Play_button.visible = true;
            story_Button.visible = true;
            HTP_Button.visible =true;
            if(mouseIsOver(Play_button)){
                Play_button.scale = 1.15;
                if(mousePressedOver(Play_button)){
                  gameState = PLAY;
                  Tittle.visible = false;
                  Play_button.visible = false;
                  story_Button.visible = false;
                  HTP_Button.visible = false;
                  showstory = false;
                  showHTP = false;
                }
            }else{
                Play_button.scale = 1.0;
            }
            if(mouseIsOver(story_Button)){
                story_Button.scale = 1.15;
                if(mousePressedOver(story_Button)){
                    showstory = true;
                  }
            }else{
                story_Button.scale = 1.0;
            }
            if(mouseIsOver(HTP_Button)){
                HTP_Button.scale = 1.15;
                if(mousePressedOver(HTP_Button)){
                    showHTP = true;
                  }
            }else{
                HTP_Button.scale = 1.0;
            }

             if(showstory === true){
                 story.visible = true;
                 if(mousePressedOver(story)){
                     showstory = false;
                 }
             }else{
                if(showstory === false){
                    story.visible = false;
                }
             }
             if(showHTP === true){
                htp.visible = true;
                if(mousePressedOver(htp)){
                    showHTP = false;
                }
            }else{
               if(showHTP === false){
                   htp.visible = false;
               }
            }

         }
     }
    }
 }
 drawSprites();

 if(gameState===END){
    loose(); 
   }

   if(gameState===WIN){
    win(); 
   }  
   //90 === z;
 if(gameState===PLAY){
 if(keyIsDown(90)){
    imageMode(CENTER);
    image(sheild,prince.x,prince.y,35,40);
    }
    setVelocityaccordingtokeyPressed();
    fill(255);
    textSize(30);
    text("prince x " + plifes,castle.x-100,windowHeight/16);

     if(frameCount%30===0 && shooter!==null){
         shoot(shooter.x,shooter.y);
     }
     if(frameCount%30===0 && shooter2!==null){
        shoot(shooter2.x,shooter2.y);
    }
     if(frameCount%15===0){
        spawnEnemy();
    }
}
    }

     function shoot(xpos,ypos){
     fireball = createSprite(xpos,ypos,20,20);
     fireball.lifetime = windowWidth/12;
     fireball.addImage("fireball",fi);
     fireball.scale = 0.15;
     fireball.velocityX = 8;
     fireball.velocityY = 8;
     fireball.rotateToDirection=true;
     fireball.pointTo(prince.x,prince.y);
     if(shooter){
     fireball.depth = shooter.depth-1;
    }else{
    if(shooter2){
        fireball.depth = shooter2.depth-1;
       }
    }
     fbg.add(fireball);
     Throw_FB_sound.play();
     }
 
 function death(){
  plifes = plifes-1;
  KillS.play();
  if(plifes>=0){
  respawn();
 }else{
     if(plifes<0){
         gameState = END;
     }
 }
 }
 
 function respawn(){
  prince.x = 0
  prince.y = 325;
 }
 
 function throwJavlin(){
     javlin = createSprite(prince.x+100,prince.y,20,20);
     javlin.lifetime = 100;
     javlin.addImage(javlinimg);
     javlin.scale = 0.15;
     javlin.velocityX = 16;
     jg.add(javlin);
}
 
 function keyPressed(){
     if(gameState===PLAY){
    if(keyCode===71){
        throwJavlin();
}
    if(! keyDown(90)){
   if(keyIsDown(RIGHT_ARROW)){
    prince.addAnimation("prince",Prince_Right_run);
   }
   else
    if(keyIsDown(LEFT_ARROW)){
        prince.addAnimation("prince",Prince_Left_run);
       }
    else if(keyIsDown(UP_ARROW)){
        if(prince.velocityX===5){
            prince.addAnimation("prince",Prince_Right_run);
        }else 
        prince.addAnimation("prince",Prince_Left_run);
    }
    else if(keyIsDown(DOWN_ARROW)){
        if(prince.velocityX===5){
            prince.addAnimation("prince",Prince_Right_run);
        }else 
        prince.addAnimation("prince",Prince_Left_run);
    }else if(keyIsDown(71)){
        prince.addAnimation("prince", prince_throw);
    }
    else
        prince.addAnimation("prince",Prince_idle);
 }
}
}
    function setVelocityaccordingtokeyPressed(){
    if(! keyIsDown(90)){
        // 87 = up
    if(keyDown(UP_ARROW)){
        prince.velocityY = -5;
    }
    // 83 = down
    if(keyDown(DOWN_ARROW)){
        prince.velocityY = 5;
    }
    if(keyDown(RIGHT_ARROW)){
        prince.velocityX = 5;
    }
    if(keyDown(LEFT_ARROW)){
        prince.velocityX = -5;
    }
    }
    }

    function spawnEnemy(){
    if(gameState===PLAY){
    enemy = createSprite(windowWidth+100,prince.y);
    enemy.addAnimation("enemy",enemyA);
    enemy.velocityX = -12;
    enemy.scale = 0.3;
    enemy_Group.add(enemy);
    }
}

function win(){
    imageMode(CENTER);
    image(winimg, width/2, height/2, width,height);
 
}

function loose(){
    imageMode(CENTER);
    image(looseImg, width/2, height/2, width,height);
}