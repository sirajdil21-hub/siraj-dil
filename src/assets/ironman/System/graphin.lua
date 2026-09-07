function Initialize()
   	nv=SKIN:GetMeasure("MeasureTcpIn")
	PI=3.14159
	glen=30
   	glong={}
	x0=417
	y0=237
	an0=24.6
	r0=341
	imgw=44
end

function Drawline(nlong,n)
	an=an0-n*0.82
	an2=-an	
	r1=r0+nlong
	x1=r1*math.cos(an*PI/180)
	y1=r1*math.sin(an*PI/180)
	tx=imgw*math.cos(an*PI/180)
	ty=imgw*math.sin(an*PI/180)
	x2=math.floor(x0-x1+0.44)
	y2=math.floor(y0+y1-ty+0.44)
	metername = string.format("%s%s", "TcpInBar", tostring(n))
	SKIN:Bang('!SetOption '..metername..' ImageRotate '..(an2))
	SKIN:Bang('!SetOption '..metername..' x '..x2)
	SKIN:Bang('!SetOption '..metername..' y '..y2)
	if nlong>=14 then
		SKIN:Bang('!SetOption '..metername..' ImageName inbar4')
	end
	if nlong>=11 then
		SKIN:Bang('!SetOption '..metername..' ImageName inbar3')
	end
	if nlong>=8 then
		SKIN:Bang('!SetOption '..metername..' ImageName inbar2')
	end
	if nlong>=4 then
		SKIN:Bang('!SetOption '..metername..' ImageName inbar1')
	end
	if nlong<4 then
		SKIN:Bang('!SetOption '..metername..' ImageName inbar')
	end
end

function Update()
	t_val = math.atan(nv:GetValue()/4295)*1.3
	if t_val == nil then t_val = 1 end
	for i = glen,1,-1 do
		if glong[i-1]==nil then glong[i-1]=0 end
		glong[i]=glong[i-1]
		if i==1 then
			glong[i] = t_val*10							
		end		
		Drawline(glong[i],i)						
	end
end