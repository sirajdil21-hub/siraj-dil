function Initialize()
   	nv=SKIN:GetMeasure("MeasureCPUAll")
	PI=3.14159
	glen=15
	x0=417
	y0=231
	an0=15.8
	r1=290
	imgw=13
	cpumax=0
	firstrun=1
end

function Drawline(imgname,n)
	an=(an0-n)*1.62
	an2=-an	
	x1=r1*math.cos(an*PI/180)
	y1=r1*math.sin(an*PI/180)
	tx=imgw*math.cos(an*PI/180)
	ty=imgw*math.sin(an*PI/180)
	x2=math.floor(x0-x1+0.44)
	y2=math.floor(y0+y1-ty+0.44)
	metername = string.format("%s%s", "CPUBar", tostring(n))
	SKIN:Bang('!SetOption '..metername..' ImageRotate '..(an2))
	SKIN:Bang('!SetOption '..metername..' x '..x2)
	SKIN:Bang('!SetOption '..metername..' y '..y2)
	SKIN:Bang('!SetOption '..metername..' ImageName '..imgname)
end

function Update()
	t_val = nv:GetValue()
	if t_val == nil then t_val = 0 end
	if t_val>0 and t_val<=5 then t_val=5 end
	nper=math.floor(t_val/5+0.5)
	for i = glen,1,-1 do
		if i<=nper then
			cpumax=i
			status = "run" 							
		else
			status = "rest"
		end
		if firstrun==1 or i>=cpumax then Drawline(status,i) end
		--if i>=cpumax then Drawline(status,i) end
	end
	firstrun=0
end