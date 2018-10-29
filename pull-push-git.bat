@ECHO OFF
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
For /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
git pull --rebase origin master
git add .
git commit -m "%mydate%_%mytime%"
git push -u origin master
pause