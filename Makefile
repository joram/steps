run:
	cd api; sudo uvicorn main:app --host 0.0.0.0 --reload --port 5000

run_remote:
	ssh -t ubuntu@steps "cd /home/ubuntu/steps; make run"

run_local:
	cd api; uvicorn main:app --host 0.0.0.0 --reload --port 5000

deploy:
	git add .
	git commit -m "deploy"
	git push origin main
	ssh ubuntu@steps -t "cd /home/ubuntu/steps; pkill -f uvicorn; git pull origin main; make run"

ssh:
	ssh ubuntu@steps -t "top"

stop:
	ssh ubuntu@steps -t "pkill -f uvicorn"